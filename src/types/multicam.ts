export interface MulticamIntakeData {
    // Step 1: Basic Information
    artistName: string;
    email: string;
    phone: string;

    // Step 2: Project Description
    projectDescription: string;

    // Step 3: Event Details
    eventName: string;
    eventDate: string;
    eventLocation: string;
    eventDuration: string;

    // Step 4: Technical Requirements
    numberOfCameras: number;
    streamingPlatform: string;
    recordingFormat: string;
    additionalRequirements: string;

    // Step 5: Budget & Payment
    budget: string;
    paymentPreference: "one-time" | "subscription";

    // Step 6: Additional Info
    specialRequests: string;
    referralSource: string;
}

export type WorkflowStep = "intake" | "consultation" | "shoot" | "post" | "delivery";

export interface StepData {
    step: WorkflowStep;
    completed: boolean;
    completedAt?: string;
    notes?: string;
    attachments?: FileAttachment[];
}

export interface FileAttachment {
    id: string;
    filename: string;
    url: string;
    uploadedAt: string;
    uploadedBy: string; // email
    fileType: string;
    fileSize: number;
}

export interface MulticamRequest {
    id: string;
    createdAt: string;
    status: "pending" | "approved" | "in-progress" | "completed" | "cancelled";
    intakeData: MulticamIntakeData;
    quote?: number;
    balance?: number;
    currentStep: WorkflowStep;
    steps: StepData[];
}

export interface ArtistAccount {
    id: string;
    email: string;
    artistName: string;
    requests: MulticamRequest[];
    balance: number;
    subscriptionActive: boolean;
    subscriptionId?: string;
    // Shopify custom fields
    shopifyCustomerId?: string;
    customFields?: Record<string, any>;
}

export interface AdminUser {
    email: string;
    name?: string;
    permissions: string[];
}

