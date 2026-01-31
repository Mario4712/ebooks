"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewList } from "./ReviewList"

interface EbookTabsProps {
  ebook: {
    id: string
    description: string
    pages?: number | null
    language: string
    isbn?: string | null
    publisher?: string | null
  }
}

export function EbookTabs({ ebook }: EbookTabsProps) {
  return (
    <Tabs defaultValue="description" className="mt-8">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="description">Descrição</TabsTrigger>
        <TabsTrigger value="specs">Especificações</TabsTrigger>
        <TabsTrigger value="reviews">Avaliações</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="mt-4">
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: ebook.description.replace(/\n/g, "<br />") }} />
        </div>
      </TabsContent>
      <TabsContent value="specs" className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Formato</span>
            <span>PDF, EPUB, MOBI</span>
          </div>
          {ebook.pages && (
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Páginas</span>
              <span>{ebook.pages}</span>
            </div>
          )}
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Idioma</span>
            <span>{ebook.language}</span>
          </div>
          {ebook.isbn && (
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">ISBN</span>
              <span>{ebook.isbn}</span>
            </div>
          )}
          {ebook.publisher && (
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Editora</span>
              <span>{ebook.publisher}</span>
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="reviews" className="mt-4">
        <ReviewList ebookId={ebook.id} />
      </TabsContent>
    </Tabs>
  )
}
