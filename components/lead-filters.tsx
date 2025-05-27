"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, X, ChevronDown, ChevronUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LeadFilters() {
  const [expanded, setExpanded] = useState(false)
  const [selectedManager, setSelectedManager] = useState<string>("all")
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([])

  // 샘플 데이터
  const managers = [
    { id: "all", name: "전체" },
    { id: "1", name: "김민수" },
    { id: "2", name: "이지연" },
    { id: "3", name: "박준호" },
    { id: "4", name: "정다은" },
  ]

  const programs = [
    { id: "data-analyst", name: "데이터 분석가 양성과정" },
    { id: "ai-web", name: "AI웹 풀스택 과정" },
    { id: "unity", name: "Unity 게임개발자 양성과정" },
    { id: "unreal", name: "Unreal 게임개발자 양성과정" },
    { id: "app-dev", name: "앱 제작 실무과정" },
    { id: "qa-qc", name: "빅데이터 기반 품질 관리(QA,QC)" },
  ]

  const toggleProgram = (programId: string) => {
    if (selectedPrograms.includes(programId)) {
      setSelectedPrograms(selectedPrograms.filter((id) => id !== programId))
    } else {
      setSelectedPrograms([...selectedPrograms, programId])
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>리드 필터</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                접기
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                펼치기
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="my-leads">
          <TabsList className="mb-4">
            <TabsTrigger value="my-leads">내 리드</TabsTrigger>
            <TabsTrigger value="all-leads">전체 리드</TabsTrigger>
            <TabsTrigger value="unassigned">미배정 리드</TabsTrigger>
          </TabsList>

          <TabsContent value="my-leads" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="이름 검색" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">전화번호</Label>
                <Input id="phone" placeholder="전화번호 검색" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" placeholder="이메일 검색" />
              </div>
            </div>

            {expanded && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label>세일즈 품목/과정</Label>
                    <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto border rounded-md p-2">
                      {programs.map((program) => (
                        <div key={program.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`program-${program.id}`}
                            checked={selectedPrograms.includes(program.id)}
                            onCheckedChange={() => toggleProgram(program.id)}
                          />
                          <label htmlFor={`program-${program.id}`} className="text-sm cursor-pointer">
                            {program.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>추가 필터</Label>
                    <div className="space-y-2 border rounded-md p-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="no-reply" />
                        <label htmlFor="no-reply" className="text-sm cursor-pointer">
                          부재중 표시
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="callback" />
                        <label htmlFor="callback" className="text-sm cursor-pointer">
                          콜백 요청
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="today-created" />
                        <label htmlFor="today-created" className="text-sm cursor-pointer">
                          오늘 생성된 리드
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-range">기간</Label>
                    <div className="flex items-center space-x-2">
                      <Input type="date" className="flex-1" />
                      <span>~</span>
                      <Input type="date" className="flex-1" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  <Label className="mb-2 block">태그</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      9to9
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      KDT중복
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      국취제
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      일정조정
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      카드발급중
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      + 태그 추가
                    </Badge>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" className="flex items-center gap-2">
                <X className="h-4 w-4" />
                초기화
              </Button>
              <Button className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700">
                <Search className="h-4 w-4" />
                검색
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="all-leads">
            <div className="text-center py-4 text-gray-500">전체 리드 필터 옵션이 여기에 표시됩니다.</div>
          </TabsContent>

          <TabsContent value="unassigned">
            <div className="text-center py-4 text-gray-500">미배정 리드 필터 옵션이 여기에 표시됩니다.</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
