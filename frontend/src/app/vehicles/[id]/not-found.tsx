import Link from "next/link";
import { buttonClass } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { QuestionIcon } from "@/components/ui/icons";

export default function VehicleNotFound() {
  return (
    <main>
      <EmptyState
        icon={<QuestionIcon />}
        title="Veículo não encontrado"
        description="Ele pode ter sido excluído ou não pertence à sua conta."
        action={
          <Link href="/" className={buttonClass({ size: "sm" })}>
            Voltar para a garagem
          </Link>
        }
      />
    </main>
  );
}
