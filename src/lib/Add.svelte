<script lang="ts">
  import type { KeyboardEventHandler } from "svelte/elements";
  import type { Todo } from "./types";

  type Props = { onAdd: (todo: Todo) => void };

  let { onAdd }: Props = $props();

  /**
   * エンターキー押下時、有効な文字列が入力されていたら TODO として追加する
   */
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value.trim();
    if (e.key === "Enter" && value !== "") {
      onAdd({ id: Date.now(), title: value, completed: false });
      e.currentTarget.value = ""; // 入力値をクリア
    }
  };
</script>

<div class="container">
  <input type="text" placeholder="何する？" onkeydown={handleKeyDown} />
</div>

<style>
  .container {
    max-width: 100%;
    padding-bottom: 1rem;
  }

  input {
    width: 80rem;
    max-width: 100%;
    font-size: 1rem;
    padding: 12px;
    border: 2px solid var(--brand-x-light);
    border-radius: 4px;
  }
</style>
