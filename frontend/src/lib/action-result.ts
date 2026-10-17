export type ActionError = {
  error: string;
  fieldErrors?: Record<string, string>;
};

export type ActionSuccess = { success: string };

export type ActionResult = ActionError | ActionSuccess;
