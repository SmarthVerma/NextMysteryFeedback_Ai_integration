// src/store/types.ts
import { SessionState } from './features/session/type';

export interface RootState {
  session: SessionState;
}