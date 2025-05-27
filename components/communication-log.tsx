"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Plus } from "lucide-react"
import type { CommunicationLog } from "@/types/lead"

interface CommunicationLogComponentProps {
  leadId: string
  communicationLogs: CommunicationLog[]
}

export default function CommunicationLogComponent({ leadId, communicationLogs }: CommunicationLogComponentProps) {
  const [newLogContent, setNewLogContent] = useState("")

  // 커뮤니케이션 로그 저장 핸들러
  const handleSaveLog = () => {
    if (!newLogContent.trim()) return

    // 실제로는 API 호출하여 저장
    console.log({
      leadId,
      type: "note",
      content: newLogContent,
    })

    // 저장 후 폼 초기화
    setNewLogContent("")
  }

  // 필터링된 로그 가져오기 (배정 로그 제외)
  const getFilteredLogs = () => {
    const filtered = communicationLogs.filter((log) => log.type !== "assignment")

    // 날짜순 정렬 (최신순)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  return (
    <Card className="border-[#E4EBF0] shadow-none">
      <div className="p-4 border-b border-[#E4EBF0]">
        <h2 className="text-lg font-semibold text-[#141617]">콜/상담 로그</h2>
      </div>

      <CardContent className="p-4">
        <div className="mb-6">
          <Textarea
            placeholder="상담 내용을 입력하세요..."
            className="min-h-[100px] border-[#D7E0E6] mb-3"
            value={newLogContent}
            onChange={(e) => setNewLogContent(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              className="bg-[#E8344E] hover:bg-[#D1213B] text-white"
              onClick={handleSaveLog}
              disabled={!newLogContent.trim()}
            >
              <Plus className="h-4 w-4 mr-1" />
              저장
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {getFilteredLogs().length > 0 ? (
            getFilteredLogs().map((log) => (
              <div key={log.id} className="border border-[#E4EBF0] rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="ml-2">
                      <div className="font-medium text-[#141617]">{log.createdBy}</div>
                      <div className="flex items-center text-xs text-[#81898F] mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {log.date}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-[#3A3E41] whitespace-pre-line">{log.content}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-[#81898F]">
              <p>콜/상담 로그가 없습니다.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
