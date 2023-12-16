export function useClassTable() {
  const selected = useState(() => []);
  const query = useState(() => "");
  const selecting = useState(() => []);
  return { selected, selecting, query };
}
