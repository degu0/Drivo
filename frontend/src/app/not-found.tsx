import Link from "next/link";
import { buttonClass } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { QuestionIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <main>
      <EmptyState
        icon={<QuestionIcon />}
        title="Página não encontrada"
        description="O endereço pode estar errado ou a página não existe mais."
        action={
          <Link href="/" className={buttonClass({ size: "sm" })}>
            Ir para a garagem
          </Link>
        }
      />
    </main>
  );
}
