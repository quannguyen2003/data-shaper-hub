import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { DataPreview } from "@/components/DataPreview";
import { FileManager } from "@/components/FileManager";
import { QualityCheck } from "@/components/QualityCheck";

export interface CSVData {
  proj_id: string;
  question: string;
  output: string;
  updated: string;
  source: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  uploader: string;
  description?: string;
  tags?: string[];
  data: CSVData[];
  status: 'processing' | 'success' | 'error';
  qualityIssues: number;
}

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);

  const handleFileUpload = (file: UploadedFile) => {
    setUploadedFiles(prev => [...prev, file]);
    setSelectedFile(file);
  };

  const handleFileSelect = (file: UploadedFile) => {
    setSelectedFile(file);
  };

  const handleFileDelete = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 shadow-soft">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                DataFlow Analytics
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Research data management and collaboration platform
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {uploadedFiles.length} files uploaded
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Upload & File Management */}
          <div className="lg:col-span-1 space-y-6">
            <FileUpload onFileUpload={handleFileUpload} />
            <FileManager 
              files={uploadedFiles}
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
              onFileDelete={handleFileDelete}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {selectedFile && (
              <>
                <QualityCheck file={selectedFile} />
                <DataPreview file={selectedFile} />
              </>
            )}
            
            {!selectedFile && uploadedFiles.length === 0 && (
              <div className="bg-card border border-border/50 rounded-lg p-12 text-center animate-fade-in">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-soft rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    Welcome to DataFlow Analytics
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Upload your first CSV file to get started with data analysis and collaboration.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Supports proj_id, question, output, updated, and source columns
                  </div>
                </div>
              </div>
            )}

            {!selectedFile && uploadedFiles.length > 0 && (
              <div className="bg-card border border-border/50 rounded-lg p-8 text-center animate-fade-in">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  Select a file to preview
                </h3>
                <p className="text-muted-foreground">
                  Choose a file from the sidebar to view its data and quality metrics.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;