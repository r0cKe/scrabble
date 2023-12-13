"use client";

import { useEffect, useState } from "react";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Button from "./button";
import { BuiltInProviderType } from "next-auth/providers/index";

const AuthProviders = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      console.log(res);
      setProviders(res);
    };
    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider, i) => (
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
