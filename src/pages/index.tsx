import { useEffect, useRouter } from "@site/utilities/deps";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to enter-store page
    router.replace("/enter-store");
  }, [router]);

  return null;
}
