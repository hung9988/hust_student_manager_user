export function useClassTable() {
  const selected = useState<any[]>(() => []);

  return { selected };
}
