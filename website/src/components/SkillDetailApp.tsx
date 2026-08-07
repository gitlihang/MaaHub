import React from 'react';
import { Header } from './Header';
import { ArrowLeft, Clock, Puzzle, Copy, Check, Terminal, Tag } from 'lucide-react';
import { ui } from '../i18n/utils';
import { cn } from '../lib/utils';
import { sitePath } from '../lib/routes';
import { FileViewer, type DownloadFile } from './FileViewer';
import { DownloadSection } from './DownloadSection';
import { getSkillInstallCommand } from '../lib/skillInstall';

type SkillDetailData = {
  id: string;
  title?: string;
  description?: string;
  author?: string;
  status?: string;
  updatedAt?: string;
  version?: string;
  tags?: string[];
  entry?: string;
  downloadFiles?: DownloadFile[];
  skillName?: string;
  whenToUse?: string[];
  allowedTools?: string[];
  argumentHint?: string;
  disableModelInvocation?: boolean;
  userInvocable?: boolean;
  paths?: string[];
  model?: string;
  effort?: string;
  context?: string[];
  agent?: string;
  shell?: string;
};

// In a real app, this data would come from the astro page props (fetched from getCollection)
export function SkillDetailApp({ skillId, skillData, lang = 'zh' }: { skillId: string, skillData: SkillDetailData, lang?: 'zh' | 'en' }) {
  const [currentLang, setCurrentLang] = React.useState(lang);
  const [isInstallCommandCopied, setIsInstallCommandCopied] = React.useState(false);

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'en' || savedLang === 'zh') {
      setCurrentLang(savedLang);
    }
  }, []);

  if (!isClient) return <div className="min-h-screen" />;

  const toggleLang = () => {
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    setCurrentLang(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
  };

  const t = (key: keyof typeof ui['zh']) => ui[currentLang][key];

  const packageName = skillData.id.split('/')[1] || skillData.id;
  const installCommand = getSkillInstallCommand(skillData.skillName || packageName);

  const handleCopyInstallCommand = () => {
    navigator.clipboard.writeText(installCommand);
    setIsInstallCommandCopied(true);
    setTimeout(() => setIsInstallCommandCopied(false), 2000);
  };

  return (
    <>
      <Header lang={currentLang} toggleLang={toggleLang} />
      
      <main className="flex-1 bg-muted/10 pb-20">
        {/* Breadcrumb & Header Banner */}
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-8 md:px-8">
            <a href={sitePath('/skills')} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.back')}
            </a>
            
            <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                    <Puzzle className="h-6 w-6" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight">{skillData.title || skillData.skillName}</h1>
                  {skillData.status ? (
                    <span className={cn(
                      "ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      skillData.status === 'stable' ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                    )}>
                      {skillData.status}
                    </span>
                  ) : null}
                </div>
                
                <p className="text-xl text-muted-foreground mb-4 max-w-3xl">
                  {skillData.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold uppercase">
                      {skillData.author?.charAt(0) || '?'}
                    </div>
                    <span className="font-medium text-foreground">{skillData.author || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{t('common.updated')} {skillData.updatedAt}</span>
                  </div>
                  {skillData.version ? (
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      <span>v{skillData.version}</span>
                    </div>
                  ) : null}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {(skillData.tags ?? skillData.allowedTools ?? []).map((tag: string) => (
                    <span key={tag} className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-3 mt-4 md:mt-0">
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <h3 className="font-medium mb-3 flex items-center text-sm">
                    <Terminal className="mr-2 h-4 w-4 text-muted-foreground" />
                    {t('skill.install')}
                  </h3>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded bg-muted p-3 text-xs font-mono whitespace-pre-wrap break-all pr-10">
                      <code>{installCommand}</code>
                    </pre>
                    <button 
                      onClick={handleCopyInstallCommand}
                      className="absolute right-2 top-2 rounded bg-background p-1.5 text-muted-foreground hover:text-foreground border shadow-sm transition-colors"
                      title="Copy install command"
                    >
                      {isInstallCommandCopied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

                {/* Content Tabs */}
        <div className="container mx-auto px-4 py-8 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              <FileViewer files={skillData.downloadFiles} emptyLabel={t('skill.files.empty')} />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <DownloadSection files={skillData.downloadFiles} packageName={packageName} lang={currentLang} />
            </div>
            
          </div>
        </div>
      </main>
    </>
  );
}
