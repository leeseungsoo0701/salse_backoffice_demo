"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, PhoneOutgoing, PhoneMissed, FileText, Clock, Plus } from "lucide-react"
import type { CallLog, Application } from "@/types/lead"

interface CallLogComponentProps {
  leadId: string
  callLogs: CallLog[]
  applications: Application[]
}

export default function CallLogComponent({ leadId, callLogs, applications }: CallLogComponentProps) {
  const [newCallLog, setNewCallLog] = useState("")
  const [selectedType, setSelectedType] = useState<"note" | "outgoing" | "incoming" | "missed">("note")
  const [selectedApplication, setSelectedApplication] = useState<string | null>(
    applications.length > 0 ? applications[0].id : null,
  )
  const [callDuration, setCallDuration] = useState("")

  // 콜 로그 타입별 아이콘
  const getCallLogIcon = (type: string) => {
    switch (type) {
      case "outgoing":
        return <PhoneOutgoing className="h-5 w-5 text-[#0085FF]" />
      case "incoming":
        return <Phone className="h-5 w-5 text-[#27C227]" />
      case "missed":
        return <PhoneMissed className="h-5 w-5 text-[#F73620]" />
      case "note":
        return <FileText className="h-5 w-5 text-[#5F666B]" />
      default:
        return <FileText className="h-5 w-5 text-[#5F666B]" />
    }
  }

  // 콜 로그 타입별 배지 스타일
  const getCallLogBadgeStyle = (type: string) => {
    switch (type) {
      case "outgoing":
        return "bg-[#EDF6FF] text-[#0085FF] border-[#B2DAFF]"
      case "incoming":
        return "bg-[#EBFFEB] text-[#27C227] border-[#CFFCCF]"
      case "missed":
        return "bg-[#FFEFED] text-[#F73620] border-[#FFDFDB]"
      case "note":
        return "bg-[#F2F6F8] text-[#5F666B] border-[#D7E0E6]"
      default:
        return "bg-[#F2F6F8] text-[#5F666B] border-[#D7E0E6]"
    }
  }

  // 콜 로그 타입별 한글 이름
  const getCallLogTypeName = (type: string) => {
    switch (type) {
      case "outgoing":
        return "발신"
      case "incoming":
        return "수신"
      case "missed":
        return "부재중"
      case "note":
        return "메모"
      default:
        return "메모"
    }
  }

  // 콜 로그 저장 핸들러
  const handleSaveCallLog = () => {
    if (!newCallLog.trim()) return

    // 실제로는 API 호출하여 저장
    console.log({
      leadId,
      applicationId: selectedApplication,
      type: selectedType,
      content: newCallLog,
      duration: selectedType !== "note" ? callDuration : undefined,
    })

    // 저장 후 폼 초기화
    setNewCallLog("")
    setCallDuration("")
  }

  // 지원서별 콜 로그 필터링
  const getCallLogsByApplication = (applicationId: string | null) => {
    if (!applicationId) return callLogs
    return callLogs.filter((log) => log.applicationId === applicationId)
  }

  return (
    <Card className="border-[#E4EBF0] shadow-none">
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center p-4 border-b border-[#E4EBF0]">
          <h2 className="text-lg font-semibold text-[#141617]">콜/상담 로그</h2>
          <TabsList className="bg-[#F2F6F8]">
            <TabsTrigger value="all">전체</TabsTrigger>
            {applications.map((app) => (
              <TabsTrigger key={app.id} value={app.id}>
                {app.round}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <CardContent className="p-4">
          <div className="mb-6">
            <div className="grid grid-cols-12 gap-4 mb-3">
              <div className="col-span-2">
                <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="유형 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="note">메모</SelectItem>
                    <SelectItem value="outgoing">발신</SelectItem>
                    <SelectItem value="incoming">수신</SelectItem>
                    <SelectItem value="missed">부재중</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-3">
                <Select value={selectedApplication || ""} onValueChange={(value) => setSelectedApplication(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="지원 과정 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {applications.map((app) => (
                      <SelectItem key={app.id} value={app.id}>
                        {app.round}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedType !== "note" && (
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="통화 시간(초)"
                    className="form-input"
                    value={callDuration}
                    onChange={(e) => setCallDuration(e.target.value)}
                  />
                </div>
              )}
              <div className={`col-span-${selectedType !== "note" ? "5" : "7"}`}>
                <div className="flex h-full">
                  <Button
                    className="bg-[#E8344E] hover:bg-[#D1213B] text-white ml-auto"
                    onClick={handleSaveCallLog}
                    disabled={!newCallLog.trim()}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    저장
                  </Button>
                </div>
              </div>
            </div>
            <Textarea
              placeholder="상담 내용을 입력하세요..."
              className="min-h-[100px] border-[#D7E0E6]"
              value={newCallLog}
              onChange={(e) => setNewCallLog(e.target.value)}
            />
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="space-y-4">
              {callLogs.length > 0 ? (
                callLogs.map((log) => {
                  const relatedApplication = applications.find((app) => app.id === log.applicationId)

                  return (
                    <div key={log.id} className="border border-[#E4EBF0] rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {getCallLogIcon(log.type)}
                          <div className="ml-2">
                            <div className="font-medium text-[#141617]">
                              {log.createdBy}
                              <Badge variant="outline" className={`ml-2 ${getCallLogBadgeStyle(log.type)}`}>
                                {getCallLogTypeName(log.type)}
                              </Badge>
                              {log.duration && (
                                <span className="ml-2 text-sm text-[#5F666B]">
                                  {Math.floor(log.duration / 60)}분 {log.duration % 60}초
                                </span>
                              )}
                            </div>
                            <div className="flex items-center text-xs text-[#81898F] mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {log.date}
                              {relatedApplication && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span>{relatedApplication.round}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {log.tags && log.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {log.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-[#F2F6F8] text-[#5F666B] border-[#D7E0E6]"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 text-sm text-[#3A3E41] whitespace-pre-line">{log.content}</div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8 text-[#81898F]">
                  <Phone className="h-12 w-12 text-[#D7E0E6] mx-auto mb-2" />
                  <p>콜/상담 로그가 없습니다.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {applications.map((app) => (
            <TabsContent key={app.id} value={app.id} className="mt-0">
              <div className="space-y-4">
                {getCallLogsByApplication(app.id).length > 0 ? (
                  getCallLogsByApplication(app.id).map((log) => (
                    <div key={log.id} className="border border-[#E4EBF0] rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {getCallLogIcon(log.type)}
                          <div className="ml-2">
                            <div className="font-medium text-[#141617]">
                              {log.createdBy}
                              <Badge variant="outline" className={`ml-2 ${getCallLogBadgeStyle(log.type)}`}>
                                {getCallLogTypeName(log.type)}
                              </Badge>
                              {log.duration && (
                                <span className="ml-2 text-sm text-[#5F666B]">
                                  {Math.floor(log.duration / 60)}분 {log.duration % 60}초
                                </span>
                              )}
                            </div>
                            <div className="flex items-center text-xs text-[#81898F] mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {log.date}
                            </div>
                          </div>
                        </div>
                        {log.tags && log.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {log.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-[#F2F6F8] text-[#5F666B] border-[#D7E0E6]"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 text-sm text-[#3A3E41] whitespace-pre-line">{log.content}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-[#81898F]">
                    <Phone className="h-12 w-12 text-[#D7E0E6] mx-auto mb-2" />
                    <p>이 지원에 대한 콜/상담 로그가 없습니다.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </CardContent>
      </Tabs>
    </Card>
  )
}
