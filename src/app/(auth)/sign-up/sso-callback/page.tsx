import { Spinner } from "@/components/spinner";
import { AuthenticateWithRedirectCallback, useClerk } from "@clerk/nextjs";

export default function SSOCallback() {
  // const {handleRedirectCallback} = useClerk();

  // const au = async () =>{
  //   await handleRedirectCallback({
  //   });
  // }

  // au();
  // Handle the redirect flow by rendering the
  // prebuilt AuthenticateWithRedirectCallback component.
  // This is the final step in the custom OAuth flow.

  return (
    <div>
      <AuthenticateWithRedirectCallback
        continueSignUpUrl={"/sign-up"}
        signInFallbackRedirectUrl={"/dashboard"}
        signInUrl="/sign-in"
        signInForceRedirectUrl={"/dashboard"}
        signUpFallbackRedirectUrl={"/dashboard"}
        signUpForceRedirectUrl={"/dashboard"}
        signUpUrl="/sign-up"
      />
      <div className="fixed inset-0 flex justify-center items-center w-full h-full"><Spinner /></div>
    </div>
  );
}
