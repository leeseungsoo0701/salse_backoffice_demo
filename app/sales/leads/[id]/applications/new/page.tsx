"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Lead } from "@/types/lead"

export default function NewApplicationPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // 샘플 리드 데이터
  const lead: Lead = {
    id: params.id,
    name: "임태진",
    phone: "01096950351",
    email: "ltj7943@naver.com",
    birthdate: "1996-12-20",
    age: "만 29세",
    createdAt: "2025-05-12 18:44",
    updatedAt: "2025-05-12 18:44",
    isMember: true,
    assignedTo: "이동",
  }

  // 샘플 과정 데이터
  const programs = [
    { id: "p1", name: "KDT 성장형 AI웹 풀스택 어드바이스팀 프로젝트 매니저 양성과정 3회차" },
    { id: "p2", name: "KDT 실무형 데이터 분석가 양성과정 8회차" },
    { id: "p3", name: "KDT 빅데이터 기반 품질 관리(QA,QC) 전략 과정 2회차" },
    { id: "p4", name: "KDT 실무형 Unity 게임개발자 양성과정 11회차" },
    { id: "p5", name: "KDT Unreal 기반 3D 게임 개발자 양성과정 4회차" },
    { id: "p6", name: "KDT 앱 제작 실무과정 7회차" },
  ]

  // 폼 상태
  const [formData, setFormData] = useState({
    program: "",
    round: "",
    amount: "",
    status: "신규 리드",
    motivation: "",
  })

  // 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 셀렉트 핸들러
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 실제로는 API 호출하여 저장
    console.log({
      leadId: params.id,
      leadPhone: lead.phone,
      ...formData,
    })

    // 저장 후 리드 상세 페이지로 리다이렉트
    router.push(`/sales/leads/${params.id}`)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href={`/sales/leads/${params.id}`}>
          <Button variant="outline" size="icon" className="border-[#D7E0E6] bg-white text-[#3A3E41]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-[#141617]">{lead.name} - 새 지원 추가</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-[#E4EBF0] shadow-none mb-6">
          <CardHeader className="border-b border-[#E4EBF0]">
            <CardTitle>지원 정보</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="field-label">과정 선택</label>
              <Select value={formData.program} onValueChange={(value) => handleSelectChange("program", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="과정을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="field-label">회차</label>
              <Input
                name="round"
                value={formData.round}
                onChange={handleInputChange}
                placeholder="예: 데이터 기반 PM 부트캠프 3회차"
                className="form-input"
              />
            </div>

            <div>
              <label className="field-label">금액</label>
              <Input
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="예: 2,000,000원"
                className="form-input"
              />
            </div>

            <div>
              <label className="field-label">상태</label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="상태를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="신규 리드">신규 리드</SelectItem>
                  <SelectItem value="참여 가능 여부">참여 가능 여부</SelectItem>
                  <SelectItem value="세일즈 중">세일즈 중</SelectItem>
                  <SelectItem value="카드 신청">카드 신청</SelectItem>
                  <SelectItem value="수강 신청">수강 신청</SelectItem>
                  <SelectItem value="세일즈 완료">세일즈 완료</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E4EBF0] shadow-none mb-6">
          <CardHeader className="border-b border-[#E4EBF0]">
            <CardTitle>지원 동기</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              placeholder="지원 동기를 입력하세요..."
              className="min-h-[200px] form-input"
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Link href={`/sales/leads/${params.id}`}>
            <Button variant="outline" className="border-[#D7E0E6] bg-white text-[#3A3E41]">
              취소
            </Button>
          </Link>
          <Button type="submit" className="bg-[#E8344E] hover:bg-[#D1213B] text-white">
            <Save className="h-4 w-4 mr-1" />
            저장
          </Button>
        </div>
      </form>
    </div>
  )
}
