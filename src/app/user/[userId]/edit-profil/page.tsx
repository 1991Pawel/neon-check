import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserEditForm from "@/app/components/UserEditForm";
import UserPhotoUpload from "@/app/components/UserPhotoUpload";
import Map from "@/app/components/Map";

export default async function UsersId() {
  const userId = await getAuthUserId();

  const member = await getMemberByUserId(userId);

  if (!member) {
    return notFound();
  }
  return (
    <div>
      <div className={styles.user}>
        <h2>Profil</h2>
        <br />
        <h1 className={styles.userName}>
          {" "}
          imie:
          {member.name}
        </h1>
        <h2 className={styles.userName}> Zdjęcia:</h2>
        {member.photos.map((photo) => (
          <Image
            key={photo.id}
            className={styles.image}
            alt={member.name}
            src={photo.url}
            width={300}
            height={300}
          />
        ))}
        <UserPhotoUpload />

        <UserEditForm member={member} />
        {/* <Map location={member.location} /> */}
      </div>
    </div>
  );
}
