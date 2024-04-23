import Button from "@/components/Button";
import { useUserStore } from "@/context/User/useUser";
import { addUserLinks, updateUserLinks } from "@/services/firebase";
import { useAuth } from "@clerk/nextjs";

export default function LinkFooterCard() {
  const { links, canSave, setId } = useUserStore((state) => state);
  const { getToken, userId } = useAuth();

  const onSaveHandler = async () => {
    try {
      const firebaseToken = await getToken({
        template: "integration_firebase",
      });
      const allPromises = links!.map((link, index) => {
        if (link.fromLocal) {
          return addUserLinks(firebaseToken!, index, {
            platform: link.platform,
            url: link.url,
            user_id: userId!,
          });
        }

        return updateUserLinks(firebaseToken!, index, link.id, {
          platform: link.platform,
          url: link.url,
          user_id: userId!,
        });
      });

      const allLinks = await Promise.all(allPromises);

      allLinks.forEach((link) => {
        if (link) {
          setId(link.index, link.doc.id);
        }
      });
    } catch (err) {
      console.log({ err });
    }
  };
  return (
    <div className="flex flex-col w-full">
      <hr className="h-px bg-borders w-full" />
      <div className="p-4">
        <Button onClick={onSaveHandler} disabled={!canSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
