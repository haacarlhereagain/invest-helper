<template>
  <div class="table">
    <table>
        <thead>
            <tr>
                <th
                    v-for="({ field, label }) in columnList"
                    :key="field"
                >
                    {{ label }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(row, idx) in data"
                :key="(row as any)[idKey] || idx"
            >
                <td
                    v-for="({ field }) in columnList"
                    :key="field"
                >
                    <slot
                        :name="`row-${field}`"
                        :row="row"
                    >
                        {{ (row as any)[field] }}
                    </slot>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup generic="Row extends object, Column extends string = string">
import { IColumn } from '../../types';

withDefaults(defineProps<{
    data: Row[];
    columnList: IColumn<Column>[];
    idKey?: keyof Row;
}>(), {
    data: () => [],
});
</script>

<style lang="scss" scoped>
.table {
    overflow: auto;
    position: relative;

    table {
        border-collapse: collapse;

        thead {
            position: sticky;
            top: 0;

            th {
                background-color: white;
            }
        }

        tbody {
            tr {
                td {
                    padding: 0px 6px;
                }

                td:first-child {
                    padding-left: 0;
                }

                td:last-child {
                    padding-right: 0;
                }
            }
        }
    }
}
</style>