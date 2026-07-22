import { useState, useRef, useCallback } from 'react';

interface UseSecretUnlockOptions {
  requiredTaps?: number;
  resetDelayMs?: number;
  onUnlock: () => void;
}

export function useSecretUnlock({
  requiredTaps = 10,
  resetDelayMs = 1000,
  onUnlock
}: UseSecretUnlockOptions) {
  const [tapCount, setTapCount] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTap = useCallback(() => {
    // Clear timeout if exists
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setTapCount((prev) => {
      const next = prev + 1;
      if (next >= requiredTaps) {
        setIsUnlocked(true);
        onUnlock();
        setTimeout(() => setIsUnlocked(false), 2000);
        return 0; // reset tap count after unlock
      }
      return next;
    });

    // Reset tap count after delay if user pauses
    timerRef.current = setTimeout(() => {
      setTapCount(0);
    }, resetDelayMs);
  }, [requiredTaps, resetDelayMs, onUnlock]);

  return {
    tapCount,
    requiredTaps,
    isUnlocked,
    handleTap
  };
}
