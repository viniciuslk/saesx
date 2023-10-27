'use client'

import {Card} from "@saesx/components/Card";
import {Typography} from "@saesx/components/Typography";
import {FiGithub} from "react-icons/fi";
import {Field} from "@saesx/components/Field";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {signIn} from "next-auth/react";

export default function AuthSignInPage() {
  const params = useSearchParams()
  function handleSignInByGithub() {
    signIn("github", { callbackUrl: params.get('callbackUrl') as string })
  }

  return (
    <div className="w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
      <div className="-z-0 w-full h-full absolute bg-black opacity-70" />
      <div
        className="z-10 relative mt-7 opacity-100 duration-500 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
        <Card.Wrapper>
          <Card.Content>
            <div className="py-8 space-y-8">
              <Typography align="center" size="xxlarge">Bem-vindo ao SAES-X</Typography>

              <button
                onClick={handleSignInByGithub} type="button"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-neutral-800 text-white shadow-sm align-middle hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                <FiGithub/>
                Login com o Github
              </button>

              <div
                className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6">ou
              </div>

              <div className="space-y-4">
                <div className="mb-8 space-y-4">
                  <Field.Text name="login" label="Login"/>
                  <Field.Text name="password" label="Senha" type="password"/>
                </div>

                <button type="submit"
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Sign
                  in
                </button>
              </div>
            </div>
    </Card.Content>
</Card.Wrapper>
</div>
</div>
)
}