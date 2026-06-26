import { Link } from "wouter";
import { Download, Wallet, Star, Plus, FileEdit, Eye, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { creatorResources, creatorSummary } from "@/lib/mock-data/creator-resources";
import { PriceTag } from "@/components/ui/PriceTag";

export default function SalesDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Creator dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your resources and track sales.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/tutor/resources/bundle-builder"><PlusCircle className="mr-2 h-4 w-4" /> New Bundle</Link>
          </Button>
          <Button asChild data-testid="btn-upload-new">
            <Link href="/tutor/resources/upload"><Plus className="mr-2 h-4 w-4" /> Upload Resource</Link>
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creatorSummary.totalDownloads.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PKR {creatorSummary.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">After platform fee (30%), you've earned PKR {creatorSummary.totalRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creatorSummary.averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground mt-1">From {creatorResources.reduce((acc, r) => acc + r.reviewCount, 0)} reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-xl bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Downloads</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creatorResources.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No resources uploaded yet. Click 'Upload Resource' to get started.
                </TableCell>
              </TableRow>
            ) : (
              creatorResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium max-w-[200px] truncate" title={resource.title}>{resource.title}</TableCell>
                  <TableCell><Badge variant="outline" className="capitalize">{resource.type.replace('-', ' ')}</Badge></TableCell>
                  <TableCell className="text-right">{resource.downloads.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium text-green-600 dark:text-green-400">
                    {resource.revenue > 0 ? `PKR ${resource.revenue.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell>
                    {resource.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> 
                        {resource.rating} 
                        <span className="text-muted-foreground text-xs ml-1">({resource.reviewCount})</span>
                      </div>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={resource.status === 'published' ? 'default' : 'secondary'} className={resource.status === 'published' ? 'bg-teal-500 hover:bg-teal-600' : ''}>
                      {resource.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><FileEdit className="h-4 w-4 text-muted-foreground hover:text-foreground transition-all duration-200" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4 text-muted-foreground hover:text-foreground transition-all duration-200" /></Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}