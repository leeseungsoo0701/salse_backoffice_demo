"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface LostButtonProps {
  leadId: string
  leadName: string
}

export default function LostButton({ leadId, leadName }: LostButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handleMarkAsLost = async () => {
    if (!window.confirm(`${leadName}을(를) Lost 처리하시겠습니까?`)) {
      return
    }

    setIsProcessing(true)

    try {
      // 실제 구현에서는 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert(`${leadName}이(가) Lost 처리되었습니다.`)

      // 페이지 새로고침 또는 리다이렉트
      router.refresh()

      console.log(`리드 ${leadId}가 Lost 처리됨`)
    } catch (error) {
      console.error("Lost 처리 실패:", error)
      alert("Lost 처리에 실패했습니다.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 border-[#FFDFDB] bg-[#FFEFED] text-[#F73620] hover:bg-[#FFE0DB]"
      onClick={handleMarkAsLost}
      disabled={isProcessing}
    >
      <Trash2 className="h-4 w-4" />
      {isProcessing ? "처리 중..." : "Lost 처리"}
    </Button>
  )
}
