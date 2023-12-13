"use client";

import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Button from "./button";

type Provider = {
  id: string;
  name: string;
  type: string;
  singinUrl: string;
  callbackUrl: string;
  signinUrlParams: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <Button
            key={i}
            className="flexStart gap-1 bg-secondaryBg"
            onClick={() => signIn(provider?.id)}
          >
            Sign in with
            {provider?.name === "Google" && <FcGoogle className="w-6 h-6" />}
          </Button>
        ))}
      </div>
    );
  }
};

export default AuthProviders;
