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
  <div>
    {#if remaining === 0}
      すべて完了
    {:else}
      残り{remaining}件
    {/if}
  </div>
  <div>
    <button onclick={() => (filter = "all")}>すべて</button>
    <button onclick={() => (filter = "active")}>実施中</button>
    <button onclick={() => (filter = "completed")}>完了済み</button>
  </div>
  <div>
    <button onclick={clearCompleted}>完了済みをクリア</button>
  </div>
</div>

<style>
  .container {
    display: flex;
  }
</style>
