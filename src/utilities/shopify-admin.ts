import { env } from "./env";

const shopDomain = env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const adminAccessToken = env.SHOPIFY_ADMIN_ACCESS_TOKEN;

if (!shopDomain || !adminAccessToken) {
    console.warn("Shopify Admin API credentials not configured");
}

export async function findCustomerByEmail(email: string) {
    if (!shopDomain || !adminAccessToken) {
        throw new Error("Shopify Admin API not configured");
    }

    // Ensure shopDomain doesn't already include https://
    const domain = shopDomain.startsWith("http") ? shopDomain : `https://${shopDomain}`;

    const response = await fetch(
        `${domain}/admin/api/2024-01/customers/search.json?query=email:${encodeURIComponent(email)}`,
        {
            headers: {
                "X-Shopify-Access-Token": adminAccessToken,
            },
        },
    );

    if (!response.ok) {
        throw new Error(`Failed to search customer: ${response.statusText}`);
    }

    const data = await response.json();
    return data.customers?.[0] || null;
}

export async function createCustomer(email: string, firstName: string, phone?: string, password: string = "QualityControl") {
    if (!shopDomain || !adminAccessToken) {
        throw new Error("Shopify Admin API not configured");
    }

    // Ensure shopDomain doesn't already include https://
    const domain = shopDomain.startsWith("http") ? shopDomain : `https://${shopDomain}`;

    const response = await fetch(`${domain}/admin/api/2024-01/customers.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": adminAccessToken,
        },
        body: JSON.stringify({
            customer: {
                email,
                first_name: firstName,
                phone: phone || "",
                tags: "multicam-artist",
                note: "Created via Multicam Intake Form",
                password,
                password_confirmation: password,
                send_email_welcome: false, // We'll handle welcome email separately
            },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        // Check if customer already exists
        if (response.status === 422) {
            const existingCustomer = await findCustomerByEmail(email);
            if (existingCustomer) {
                // Update password for existing customer
                await updateCustomerPassword(existingCustomer.id.toString(), password);
                return existingCustomer;
            }
        }
        throw new Error(`Failed to create customer: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    // Validate customer was created
    if (!data.customer || !data.customer.id) {
        throw new Error("Customer creation succeeded but no customer data returned");
    }

    // Store default password in metafield for reference
    try {
        await updateCustomerMetafields(data.customer.id.toString(), [
            {
                namespace: "multicam",
                key: "default_password",
                value: password,
                type: "single_line_text_field",
            },
        ]);
    } catch (metafieldError) {
        // Log but don't fail if metafield update fails
        console.warn("Failed to update password metafield:", metafieldError);
    }

    return data.customer;
}

export async function updateCustomerPassword(customerId: string, password: string) {
    if (!shopDomain || !adminAccessToken) {
        throw new Error("Shopify Admin API not configured");
    }

    // Ensure shopDomain doesn't already include https://
    const domain = shopDomain.startsWith("http") ? shopDomain : `https://${shopDomain}`;

    const response = await fetch(`${domain}/admin/api/2024-01/customers/${customerId}.json`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": adminAccessToken,
        },
        body: JSON.stringify({
            customer: {
                id: customerId,
                password,
                password_confirmation: password,
            },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update customer password: ${JSON.stringify(errorData)}`);
    }

    // Update password in metafield
    await updateCustomerMetafields(customerId, [
        {
            namespace: "multicam",
            key: "default_password",
            value: password,
            type: "single_line_text_field",
        },
    ]);

    return true;
}

export async function updateCustomerMetafields(
    customerId: string,
    metafields: Array<{ namespace: string; key: string; value: string; type: string }>,
) {
    if (!shopDomain || !adminAccessToken) {
        throw new Error("Shopify Admin API not configured");
    }

    // Ensure shopDomain doesn't already include https://
    const domain = shopDomain.startsWith("http") ? shopDomain : `https://${shopDomain}`;

    // Create metafields for the customer
    const promises = metafields.map((metafield) =>
        fetch(`${domain}/admin/api/2024-01/customers/${customerId}/metafields.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": adminAccessToken,
            },
            body: JSON.stringify({
                metafield: {
                    namespace: metafield.namespace,
                    key: metafield.key,
                    value: metafield.value,
                    type: metafield.type,
                },
            }),
        }),
    );

    await Promise.all(promises);
}

export async function createDraftOrder(customerId: string, lineItems: Array<{ title: string; quantity: number; price: number }>) {
    if (!shopDomain || !adminAccessToken) {
        throw new Error("Shopify Admin API not configured");
    }

    // Ensure shopDomain doesn't already include https://
    const domain = shopDomain.startsWith("http") ? shopDomain : `https://${shopDomain}`;

    const response = await fetch(`${domain}/admin/api/2024-01/draft_orders.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": adminAccessToken,
        },
        body: JSON.stringify({
            draft_order: {
                customer_id: customerId,
                line_items: lineItems,
                tags: "multicam-request",
            },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create draft order: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.draft_order;
}

