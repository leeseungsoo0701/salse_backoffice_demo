import { UserPlus, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Lead, CommunicationLog } from "@/types/lead"

interface AssignmentInfoProps {
  lead: Lead
  assignmentLogs: CommunicationLog[]
}

export default function AssignmentInfo({ lead, assignmentLogs }: AssignmentInfoProps) {
  // 가장 최근 배정 로그 가져오기
  const latestAssignment =
    assignmentLogs.length > 0
      ? assignmentLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
      : null

  return (
    <Card className="border-[#E4EBF0] shadow-none mb-6">
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#FFF7F8] flex items-center justify-center mr-4">
            <UserPlus className="h-6 w-6 text-[#E8344E]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-[#141617]">담당 매니저</h3>
            </div>
            <div className="flex items-center mt-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-[#F2F6F8] text-[#5F666B]">
                  {lead.assignedTo ? lead.assignedTo.charAt(0) : "-"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-[#3A3E41]">{lead.assignedTo || "미배정"}</div>
                {lead.assignedAt && (
                  <div className="flex items-center text-xs text-[#81898F] mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>배정일: {new Date(lead.assignedAt).toLocaleDateString("ko-KR")}</span>
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
