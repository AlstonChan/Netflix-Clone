import getAbsoluteURL from "@/lib/getAbsoluteURL";
import { GetServerSidePropsContext, PreviewData } from "next";
import { Session_VerifyDataType } from "../browse/types";
import { ParsedUrlQuery } from "querystring";

const ValidateUserState = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  host: string
) => {
  const res = await fetch(getAbsoluteURL("/api/session_verify", host), {
    method: "POST",
    redirect: "follow",
    body: JSON.stringify(context.req.cookies),
  });
  console.log(res.headers.get("Content-Type"));
  if (res.headers.get("Content-Type") === "application/json; charset=utf-8") {
    const data: Session_VerifyDataType = await res.json();

    if (data.user === null) return false;

    return true;
  } else {
    return false;
  }
};

export default ValidateUserState;
