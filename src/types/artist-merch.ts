export interface ArtistMerchIntakeData {
    // Step 1: Basic Information
    name: string;
    artistName: string;
    phone: string;

    // Step 2: Social Media & Branding
    instagram: string;
    spotify: string;
    website: string;

    // Step 3: Moodboard & Inspiration
    moodboardDescription: string;
    moodboardFiles: File[];
    inspiration: string;

    // Step 4: Project Details
    projectType: "album-art" | "merch-design" | "branding" | "other";
    timeline: string;
    budget: string;

    // Step 5: Additional Information
    specialRequests: string;
    referralSource: string;
}
