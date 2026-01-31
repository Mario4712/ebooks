import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const steps = [
  { number: 1, label: "Identificação" },
  { number: 2, label: "Pagamento" },
  { number: 3, label: "Confirmação" },
]

export function CheckoutSteps({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, i) => (
        <div key={step.number} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
                currentStep > step.number
                  ? "bg-primary text-primary-foreground"
                  : currentStep === step.number
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {currentStep > step.number ? <Check className="h-4 w-4" /> : step.number}
            </div>
            <span className={cn(
              "text-sm hidden sm:inline",
              currentStep >= step.number ? "font-medium" : "text-muted-foreground"
            )}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn(
              "w-12 h-0.5 mx-2",
              currentStep > step.number ? "bg-primary" : "bg-muted"
            )} />
          )}
        </div>
      ))}
    </div>
  )
}
