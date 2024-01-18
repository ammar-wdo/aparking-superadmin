import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
 
      <div className="h-screen flex flex-col gap-4 items-center justify-center">
        <h2 className="text-4xl font-bold">Not Found</h2>
        <p>Could not find requested resource</p>

      
        <Button variant={"link"} asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
 
  );
}
