import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Clock, FileText, Phone, Mail, Calendar, CheckCircle, AlertCircle } from "lucide-react"

interface TimelineItem {
  id: number
  date: string
  type: string
  description: string
  user: string
}

interface LeadTimelineProps {
  timeline: TimelineItem[]
}

export default function LeadTimeline({ timeline }: LeadTimelineProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "created":
        return <Clock className="h-5 w-5 text-[#0085FF]" />
      case "assigned":
        return <UserPlus className="h-5 w-5 text-[#27C227]" />
      case "note":
        return <FileText className="h-5 w-5 text-[#FFBE4D]" />
      case "call":
        return <Phone className="h-5 w-5 text-[#6E50FF]" />
      case "email":
        return <Mail className="h-5 w-5 text-[#2654EB]" />
      case "appointment":
        return <Calendar className="h-5 w-5 text-[#FF9900]" />
      case "status_change":
        return <CheckCircle className="h-5 w-5 text-[#E8344E]" />
      default:
        return <AlertCircle className="h-5 w-5 text-[#81898F]" />
    }
  }

  return (
    <Card className="border border-[#E4EBF0] shadow-none">
      <CardContent className="pt-6">
        <div className="space-y-8">
          {timeline.map((item) => (
            <div key={item.id} className="relative pl-8">
              <div className="absolute left-0 top-0 flex items-center justify-center">{getIcon(item.type)}</div>
              <div>
                <p className="font-medium text-[#3A3E41]">{item.description}</p>
                <div className="flex items-center text-sm text-[#81898F] mt-1">
                  <p>{new Date(item.date).toLocaleString("ko-KR")}</p>
                  <span className="mx-2">•</span>
                  <p>{item.user}</p>
                </div>
              </div>
              {/* 타임라인 연결선 */}
              {timeline.indexOf(item) !== timeline.length - 1 && (
                <div className="absolute left-2.5 top-6 w-px h-6 bg-[#E4EBF0]" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
