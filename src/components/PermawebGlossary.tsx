'use client'
import { useGateways } from '@/components/GatewayProvider'

export default function PermawebGlossary() {
  const { defaultGateway } = useGateways();
  const baseUrl = `https://glossary.permagate.io`.replace('permagate.io', defaultGateway);

  return (
    <div className="mt-6">
      <div className="block dark:hidden">
        <iframe 
          className="w-full h-[600px] border-0 rounded-lg shadow-sm" 
          src={`${baseUrl}/?hide-header=true&transparent=true&link-color=%2310b981&accent-color=%2310b981`}
        />
      </div>
      <div className="hidden dark:block">
        <iframe 
          className="w-full h-[600px] border-0 rounded-lg shadow-sm" 
          src={`${baseUrl}/?bg-color=%2318181B&text-color=%23e0e0e0&link-color=%2334d399&border-color=%23444444&hover-bg=%23222222&heading-color=%23ffffff&button-bg=%23444444&button-text=%23ffffff&section-bg=%23333333&section-color=%23ffffff&category-bg=%23333333&category-text=%23ffffff&tag-bg=%233a3a3a&tag-text=%23e0e0e0&accent-color=%2334d399&secondary-text=%23a0a0a0&result-bg=%231e1e1e&result-hover=%23333333&hide-header=true&transparent=true`}
        />
      </div>
    </div>
  );
} 