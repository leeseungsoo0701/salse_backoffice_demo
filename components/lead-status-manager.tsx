"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, AlertCircle, CheckCircle, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LeadStatusManagerProps {
  lead: any
}

export default function LeadStatusManager({ lead }: LeadStatusManagerProps) {
  const [selectedStatus, setSelectedStatus] = useState(lead.status)
  const [callbackDate, setCallbackDate] = useState("")
  const [callbackTime, setCallbackTime] = useState("")
  const [noReplyCount, setNoReplyCount] = useState(lead.noReply || 0)

  const statusOptions = [
    { id: "new-lead", label: "신규리드", description: "세일즈 시작 및 터치가 닿지 않은 상태" },
    { id: "eligibility-check", label: "참여 가능 여부", description: "9to9 / KDT중복 / 행정사항" },
    { id: "in-sales", label: "세일즈 중", description: "설득 / 일정 조정 / 국취제 등" },
    { id: "card-application", label: "카드신청", description: "카드 확인 후 카드 신청을 안내 완료한 상태" },
    { id: "course-registration", label: "수강신청", description: "수강 신청을 안내 완료한 상태" },
    { id: "sales-complete", label: "세일즈 완료", description: "수강 신청 확인 완료 및 합격 대기 상태" },
  ]

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
  }

  const handleSaveStatus = () => {
    console.log("상태 변경:", selectedStatus)
    // API 호출하여 상태 저장
  }

  const handleSetCallback = () => {
    if (!callbackDate || !callbackTime) return
    console.log("콜백 설정:", `${callbackDate} ${callbackTime}`)
    // API 호출하여 콜백 정보 저장
  }

  const handleNoReply = () => {
    const newCount = noReplyCount + 1
    setNoReplyCount(newCount)
    console.log("부재중 카운트 증가:", newCount)
    // API 호출하여 부재중 카운트 저장
  }

  const handleClearNoReply = () => {
    setNoReplyCount(0)
    console.log("부재중 카운트 초기화")
    // API 호출하여 부재중 카운트 초기화
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>리드 상태 관리</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="status">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="status">상태 변경</TabsTrigger>
            <TabsTrigger value="callback">콜백 설정</TabsTrigger>
            <TabsTrigger value="noreply">부재중</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-2">
              {statusOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={selectedStatus === option.label ? "default" : "outline"}
                  className={`justify-start h-auto py-2 px-3 ${
                    selectedStatus === option.label ? "bg-rose-600 hover:bg-rose-700" : ""
                  }`}
                  onClick={() => handleStatusChange(option.label)}
                >
                  <div className="text-left">
                    <div>{option.label}</div>
                    <div className="text-xs opacity-80 mt-1">{option.description}</div>
                  </div>
                </Button>
              ))}
            </div>

            <Button className="w-full bg-rose-600 hover:bg-rose-700 mt-4" onClick={handleSaveStatus}>
              상태 변경
            </Button>
          </TabsContent>

          <TabsContent value="callback" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="callback-date">날짜</Label>
                  <Input
                    id="callback-date"
                    type="date"
                    value={callbackDate}
                    onChange={(e) => setCallbackDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="callback-time">시간</Label>
                  <Input
                    id="callback-time"
                    type="time"
                    value={callbackTime}
                    onChange={(e) => setCallbackTime(e.target.value)}
                  />
                </div>
              </div>

              {lead.callBack && (
                <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium">현재 콜백 예정</p>
                    <p className="text-xs text-gray-500">{lead.callBack}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <Button
                className="w-full bg-rose-600 hover:bg-rose-700"
                onClick={handleSetCallback}
                disabled={!callbackDate || !callbackTime}
              >
                콜백 설정
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="noreply" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  <div>
                    <p className="font-medium">현재 부재중 상태</p>
                    <p className="text-sm text-gray-500">
                      {noReplyCount > 0 ? `${noReplyCount}회 부재중` : "부재중 기록 없음"}
                    </p>
                  </div>
                </div>

                {noReplyCount > 0 && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    부재중 {noReplyCount}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="flex items-center justify-center gap-2" onClick={handleNoReply}>
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  부재중 추가
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                  onClick={handleClearNoReply}
                  disabled={noReplyCount === 0}
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  부재중 초기화
                </Button>
              </div>

              <div className="text-xs text-gray-500 mt-2">
                <p>* 부재중 3회 이상 시 자동으로 관리자에게 알림이 전송됩니다.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
