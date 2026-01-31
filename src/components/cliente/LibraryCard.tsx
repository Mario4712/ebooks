import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, BookOpen } from "lucide-react"
import { generateDownloadToken } from "@/lib/download-token"

interface LibraryCardProps {
  ebook: {
    id: string
    title: string
    author: string
    category: string
  }
  userId: string
}

export function LibraryCard({ ebook, userId }: LibraryCardProps) {
  const formats = ["pdf", "epub", "mobi"]

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-16 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-8 w-8 text-primary/30" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{ebook.title}</h3>
            <p className="text-sm text-muted-foreground">{ebook.author}</p>
            <p className="text-xs text-muted-foreground mt-1">{ebook.category}</p>
            <div className="flex gap-2 mt-3">
              {formats.map((format) => {
                const token = generateDownloadToken({
                  userId,
                  ebookId: ebook.id,
                  format,
                })
                return (
                  <a key={format} href={`/api/download/${token}`}>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      {format.toUpperCase()}
                    </Button>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
