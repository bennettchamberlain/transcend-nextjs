import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '../../utilities/env';

interface SubscribeRequest {
    email: string;
}

interface SubscribeResponse {
    success: boolean;
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SubscribeResponse>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { email }: SubscribeRequest = req.body;

        if (!email || !email.includes('@')) {
            return res.status(400).json({ success: false, message: 'Valid email is required' });
        }

        // Shopify Admin API endpoint
        const shopDomain = env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
        const adminAccessToken = env.SHOPIFY_ADMIN_ACCESS_TOKEN;

        if (!shopDomain || !adminAccessToken) {
            console.error('Missing Shopify configuration');
            return res.status(500).json({ success: false, message: 'Server configuration error' });
        }

        // Create customer with marketing consent
        const response = await fetch(`${shopDomain}/admin/api/2024-01/customers.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': adminAccessToken,
            },
            body: JSON.stringify({
                customer: {
                    email,
                    accepts_marketing: true,
                    marketing_opt_in_level: 'single_opt_in',
                    tags: 'newsletter-subscriber'
                }
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Shopify API error:', errorData);

            // Check if customer already exists
            if (response.status === 422) {
                // Try to update existing customer to accept marketing
                const updateResponse = await updateCustomerMarketing(email, shopDomain, adminAccessToken);
                if (updateResponse.success) {
                    return res.status(200).json({ success: true, message: 'Successfully subscribed to newsletter!' });
                }
            }

            return res.status(500).json({ success: false, message: 'Failed to subscribe to newsletter' });
        }

        await response.json();
        // Customer created successfully

        res.status(200).json({ success: true, message: 'Successfully subscribed to newsletter!' });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

async function updateCustomerMarketing(
    email: string,
    shopDomain: string,
    adminAccessToken: string
): Promise<{ success: boolean; message?: string }> {
    try {
        // First, find the customer by email
        const searchResponse = await fetch(
            `https://${shopDomain}/admin/api/2024-01/customers/search.json?query=email:${encodeURIComponent(email)}`,
            {
                headers: {
                    'X-Shopify-Access-Token': adminAccessToken,
                },
            }
        );

        if (!searchResponse.ok) {
            return { success: false, message: 'Failed to find customer' };
        }

        const searchData = await searchResponse.json();
        const customers = searchData.customers;

        if (!customers || customers.length === 0) {
            return { success: false, message: 'Customer not found' };
        }

        const customer = customers[0];

        // Update customer to accept marketing
        const updateResponse = await fetch(
            `https://${shopDomain}/admin/api/2024-01/customers/${customer.id}.json`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': adminAccessToken,
                },
                body: JSON.stringify({
                    customer: {
                        id: customer.id,
                        accepts_marketing: true,
                        marketing_opt_in_level: 'single_opt_in',
                        tags: customer.tags ? `${customer.tags}, newsletter-subscriber` : 'newsletter-subscriber'
                    }
                }),
            }
        );

        if (!updateResponse.ok) {
            return { success: false, message: 'Failed to update customer' };
        }

        return { success: true };
    } catch (error) {
        console.error('Update customer error:', error);
        return { success: false, message: 'Update failed' };
    }
} 