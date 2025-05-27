"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"
import type { Lead } from "@/types/lead"

interface AdminApprovalProps {
  lead: Lead
}

export default function AdminApproval({ lead }: AdminApprovalProps) {
  const [isApproved, setIsApproved] = useState(lead.adminApproved || false)
  const [isLoading, setIsLoading] = useState(false)
  const [approvalInfo, setApprovalInfo] = useState({
    approvedAt: lead.adminApprovedAt,
    approvedBy: lead.adminApprovedBy,
  })

  const handleApprovalRequest = async () => {
    setIsLoading(true)

    try {
      // 실제 구현에서는 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const now = new Date().toLocaleString("ko-KR")
      setIsApproved(true)
      setApprovalInfo({
        approvedAt: now,
        approvedBy: "시스템(자동)",
      })

      console.log("행정봇 승인 요청 성공")
    } catch (error) {
      console.error("행정봇 승인 요청 실패:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-[#E4EBF0] shadow-none mb-6">
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#F3F0FF] flex items-center justify-center mr-4">
            {isApproved ? (
              <CheckCircle className="h-6 w-6 text-[#27C227]" />
            ) : (
              <AlertCircle className="h-6 w-6 text-[#F73620]" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#141617]">행정봇 승인</h3>
              {!isApproved && (
                <Button
                  className="bg-[#E8344E] hover:bg-[#D1213B] text-white"
                  onClick={handleApprovalRequest}
                  disabled={isLoading}
                >
                  {isLoading ? "처리 중..." : "승인 요청"}
                </Button>
              )}
            </div>

            <div className="mt-2">
              <div className="flex items-center">
                <Badge
                  className={
                    isApproved
                      ? "bg-[#EBFFEB] text-[#27C227] border-[#CFFCCF]"
                      : "bg-[#FFEFED] text-[#F73620] border-[#FFDFDB]"
                  }
                >
                  {isApproved ? "승인됨" : "미승인"}
                </Badge>

                {approvalInfo.approvedAt && (
                  <div className="flex items-center ml-3 text-sm text-[#5F666B]">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{approvalInfo.approvedAt}</span>
                    {approvalInfo.approvedBy && <span className="ml-2">({approvalInfo.approvedBy})</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
