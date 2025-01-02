import Image from 'next/image';

export default function Header() {
  return (
    <div className="text-center mb-8">
      <Image src="/swallow.svg" width={100} height={100} alt="Qwabi Family Logo" className="mx-auto" />
      <h1 className="text-4xl font-bold mt-4 mb-2">Qwabi Family</h1>
      <p className="text-xl">Sizukulwana sika Sonyethe</p>
    </div>
  );
}

