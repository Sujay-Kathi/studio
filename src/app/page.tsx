import { SparkIcon } from '@/components/icons';

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <SparkIcon className="h-24 w-24 text-primary" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          Welcome to NextJS
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Get started by editing{' '}
          <code className="rounded bg-gray-200 px-2 py-1 font-mono text-sm dark:bg-gray-800">
            src/app/page.tsx
          </code>
        </p>
      </div>
    </div>
  );
}
