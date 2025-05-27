"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight } from "lucide-react"
import type { StatusChangeHistory } from "@/types/lead"

interface StatusHistoryProps {
  history: StatusChangeHistory[]
}

export default function StatusHistory({ history }: StatusHistoryProps) {
  // 상태별 배지 스타일
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "신규 리드":
        return "bg-[#EDF6FF] text-[#0085FF] border-[#B2DAFF]"
      case "참여 가능 여부":
        return "bg-[#F3F0FF] text-[#6E50FF] border-[#CCC2FF]"
      case "세일즈 중":
        return "bg-[#FFF6E5] text-[#FF9900] border-[#FFDEA6]"
      case "카드 신청":
        return "bg-[#E5FFFD] text-[#00C7B3] border-[#BEFAF4]"
      case "수강 신청":
        return "bg-[#FFF7F8] text-[#E8344E] border-[#FFBAC4]"
      case "세일즈 완료":
        return "bg-[#EBFFEB] text-[#27C227] border-[#CFFCCF]"
      case "Lost":
        return "bg-[#F2F2F2] text-[#6E6E6E] border-[#D1D1D1]"
      default:
        return "bg-[#F2F6F8] text-[#5F666B] border-[#D7E0E6]"
    }
  }

  return (
    <Card className="border-[#E4EBF0] shadow-none">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-[#141617] mb-4">상태 변경 히스토리</h3>

        {history.length > 0 ? (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="border border-[#E4EBF0] rounded-md p-3">
                <div className="flex items-center">
                  <Badge variant="outline" className={`${getStatusBadgeStyle(item.previousStatus)}`}>
                    {item.previousStatus}
                  </Badge>
                  <ArrowRight className="mx-2 h-4 w-4 text-[#9DA7AE]" />
                  <Badge variant="outline" className={`${getStatusBadgeStyle(item.newStatus)}`}>
                    {item.newStatus}
                  </Badge>
                </div>

                <div className="flex items-center text-sm text-[#5F666B] mt-2">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{item.changedAt}</span>
                  <span className="mx-2">•</span>
                  <span>{item.changedBy}</span>
                </div>

                {item.reason && (
                  <div className="mt-2 text-sm text-[#3A3E41] bg-[#F6F9FA] p-2 rounded">
                    <span className="font-medium">사유:</span> {item.reason}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-[#81898F]">
            <p>상태 변경 히스토리가 없습니다.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
