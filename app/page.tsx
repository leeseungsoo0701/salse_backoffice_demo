import { redirect } from "next/navigation"

export default function Home() {
  // 리드 조회 허브 페이지로 리다이렉트
  // redirect("/sales/leads-hub")

  // 기존 리다이렉트 유지
  redirect("/sales/leads")
}
