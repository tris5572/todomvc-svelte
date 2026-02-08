<script lang="ts">
  import type { Filter } from "./types";

  type Props = {
    /** 残件数 */
    remaining: number;
    /** 絞り込みフィルター */
    filter: Filter;
    clearCompleted: () => void;
  };

  let { remaining, filter = $bindable(), clearCompleted }: Props = $props();
</script>

<div class="container">
  <div class="remaining">
    {#if remaining === 0}
      すべて完了
    {:else}
      残り{remaining}件
    {/if}
  </div>
  <div class="filter">
    <button
      class={filter === "all" ? "selected" : ""}
      onclick={() => (filter = "all")}>すべて</button
    >
    <button
      class={filter === "active" ? "selected" : ""}
      onclick={() => (filter = "active")}>実施中</button
    >
    <button
      class={filter === "completed" ? "selected" : ""}
      onclick={() => (filter = "completed")}>完了済み</button
    >
  </div>
  <div class="clear">
    <button onclick={clearCompleted}>完了済みをクリア</button>
  </div>
</div>

<style>
  .container {
    margin-top: 0.5rem;
    padding: 0.6rem;
    background: var(--light-grey);
    border-radius: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .remaining {
    flex-grow: 0;
    color: var(--brand-dark);
  }

  .filter {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      border-radius: 0;
    }

    :first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    :last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    :not(:first-child):not(:last-child) {
      border-left: none;
      border-right: none;
    }
  }

  .clear {
    flex-grow: 0;
  }

  .selected {
    color: var(--white);
    background: var(--brand);
  }
</style>
