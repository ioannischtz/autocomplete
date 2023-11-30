export const action_types = {
  SELECT: "SELECT",
  DISMISS: "DISMISS",
} as const;

type EnumValues<T> = T[keyof T];

export type ActionType = EnumValues<typeof action_types>;

export class UserActions {
  calculatePriority(current_prio: number, action_type: string) {
    switch (action_type) {
      case "SELECT":
        return current_prio + 1;
      case "DISMISS":
        return current_prio - 1;
      default:
        return current_prio;
    }
  }
}
