"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Plus } from "lucide-react"

interface Ad { id: string; title: string; targetUrl: string; position: string; active: boolean; clickCount: number }

export default function AdminHotmartPage() {
  const [ads, setAds] = useState<Ad[]>([])
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [targetUrl, setTargetUrl] = useState("https://hotm.art/I0WwSyZ")
  const [position, setPosition] = useState("banner")

  useEffect(() => {
    fetch("/api/admin/hotmart").then((r) => r.json()).then(setAds)
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/admin/hotmart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, targetUrl, position, active: true }),
    })
    if (res.ok) {
      const ad = await res.json()
      setAds((prev) => [ad, ...prev])
      setShowForm(false)
      setTitle("")
      toast.success("Anúncio criado!")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold">Hotmart Ads</h1>
        <Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-2" /> Novo Anúncio</Button>
      </div>
      {showForm && (
        <Card>
          <CardHeader><CardTitle>Novo Anúncio</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Posição</Label>
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banner">Banner (Home)</SelectItem>
                      <SelectItem value="sidebar">Sidebar (Detalhe)</SelectItem>
                      <SelectItem value="inline">Inline (Catálogo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit">Criar</Button>
            </form>
          </CardContent>
        </Card>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Posição</TableHead>
            <TableHead>Cliques</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ads.map((ad) => (
            <TableRow key={ad.id}>
              <TableCell className="font-medium">{ad.title}</TableCell>
              <TableCell>{ad.position}</TableCell>
              <TableCell>{ad.clickCount}</TableCell>
              <TableCell><Badge variant={ad.active ? "default" : "secondary"}>{ad.active ? "Ativo" : "Inativo"}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
