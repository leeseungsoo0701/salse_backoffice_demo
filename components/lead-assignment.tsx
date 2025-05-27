"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function LeadAssignment({ lead }: { lead: any }) {
  const [selectedManager, setSelectedManager] = useState("")

  // 샘플 데이터
  const managers = [
    { id: "1", name: "김민수", avatar: "/korean-man-portrait.png", leads: 15 },
    { id: "2", name: "이지연", avatar: "/lee-ji-yeon-portrait.png", leads: 23 },
    { id: "3", name: "박준호", avatar: "/park-junho-portrait.png", leads: 8 },
    { id: "4", name: "정다은", avatar: "/jung-da-eun.png", leads: 17 },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>리드 배정</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>리드를 담당할 매니저를 배정하세요</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm">현재 담당자</p>
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src="/placeholder.svg?key=t9qml" alt="이동" />
                <AvatarFallback>이동</AvatarFallback>
              </Avatar>
              <span className="font-medium">{lead.assigned}</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm">매니저 선택</p>
            <Select value={selectedManager} onValueChange={setSelectedManager}>
              <SelectTrigger>
                <SelectValue placeholder="매니저 선택" />
              </SelectTrigger>
              <SelectContent>
                {managers.map((manager) => (
                  <SelectItem key={manager.id} value={manager.id}>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={manager.avatar || "/placeholder.svg"} alt={manager.name} />
                        <AvatarFallback>{manager.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{manager.name}</span>
                      <span className="ml-2 text-xs text-gray-500">({manager.leads}명 담당)</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {managers.map((manager) => (
              <Button
                key={manager.id}
                variant={selectedManager === manager.id ? "default" : "outline"}
                className={`justify-start ${selectedManager === manager.id ? "bg-rose-600 hover:bg-rose-700" : ""}`}
                onClick={() => setSelectedManager(manager.id)}
              >
                <div className="flex items-center w-full">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={manager.avatar || "/placeholder.svg"} alt={manager.name} />
                    <AvatarFallback>{manager.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{manager.name}</span>
                  {selectedManager === manager.id && <Check className="h-4 w-4 ml-auto" />}
                </div>
              </Button>
            ))}
          </div>

          <Button
            className="w-full bg-rose-600 hover:bg-rose-700"
            disabled={!selectedManager || selectedManager === lead.assigned}
          >
            배정하기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
