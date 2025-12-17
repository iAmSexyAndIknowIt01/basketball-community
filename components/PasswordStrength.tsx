export default function PasswordStrength({ password }: { password: string }) {
  const strength =
    password.length >= 8
      ? password.match(/[A-Z]/) && password.match(/[0-9]/)
        ? 3
        : 2
      : password.length > 0
      ? 1
      : 0

  const colors = ["bg-red-500", "bg-yellow-500", "bg-green-500"]

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className={`h-1 flex-1 rounded ${
              strength >= i ? colors[strength - 1] : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-gray-400">
        {strength === 0 && "Enter password"}
        {strength === 1 && "Weak"}
        {strength === 2 && "Medium"}
        {strength === 3 && "Strong"}
      </p>
    </div>
  )
}
