import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center mt-10 items-center">
      <SignIn path="/sign-in"/>
    </div>
  );
}
