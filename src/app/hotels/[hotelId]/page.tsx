import { getHotelById } from "@/app/actions/hotelActions";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReviewForm from "@/app/components/ReviewForm";
import { getAuthUserId } from "@/app/actions/authActions";
import ReviewsList from "@/app/components/ReviewsList";

export default async function HotelId({
  params,
}: {
  params: {
    hotelId: string;
  };
}) {
  const { hotelId } = await params;
  if (!hotelId) {
    return notFound();
  }
  const loggedUserId = await getAuthUserId({ required: false });

  const { hotel } = await getHotelById(hotelId, loggedUserId);
  const canAddReview = hotel?.canAddReview;

  if (!hotel) {
    return notFound();
  }

  return (
    <div>
      test
      <div className={style.user}>
        <h2 className={style.userName}>{hotel.name}</h2>
        <li>
          <Link className={style.link} href={`/user/${hotelId}/chat`}>
            Czat
          </Link>
        </li>
        {hotel.photos[0]?.url && (
          <Image
            className={style.image}
            alt={hotel.name || "Hotel Piesek"}
            src={hotel.photos[0].url}
            width={100}
            height={100}
          />
        )}
        <ReviewsList reviews={hotel.reviews} />
        {canAddReview && <ReviewForm />}
      </div>
    </div>
  );
}
