import type { ComponentType } from 'react';
import { TokensView } from '../views/TokensView';
import { ColorsView } from '../views/ColorsView';
import { BrandView } from '../views/BrandView';
import { ButtonsView } from '../views/ButtonsView';
import { InputView } from '../views/InputView';

import { SearchInputView } from "../views/SearchInputView";

import { SelectView } from "../views/SelectView";

import { AvatarView } from "../views/AvatarView";

import { TableView } from "../views/TableView";

import { TextView } from "../views/TextView";

import { DatePickerView } from "../views/DatePickerView";

export interface MuralEntry {
  id: string;
  label: string;
  group: string;
  view: ComponentType;
}

/**
 * Fonte unica das secoes da mural.
 * Para adicionar um novo componente na vitrine, crie a view em
 * demo/views/ e registre uma entrada aqui. Nada mais precisa mudar.
 */
export const registry: MuralEntry[] = [
  { id: 'tokens', label: 'Tokens', group: 'Fundacao', view: TokensView },
  { id: 'cores', label: 'Cores', group: 'Fundacao', view: ColorsView },
  { id: 'marca', label: 'Marca', group: 'Fundacao', view: BrandView },
  { id: 'button', label: 'Button', group: 'Componentes', view: ButtonsView },
  { id: 'input', label: 'Input', group: 'Componentes', view: InputView },
  { id: "search", label: "SearchInput", group: "Componentes", view: SearchInputView },
  { id: "select", label: "Select", group: "Componentes", view: SelectView },
  { id: "avatar", label: "Avatar", group: "Componentes", view: AvatarView },
  { id: "table", label: "Table", group: "Componentes", view: TableView },
  { id: "typography", label: "Typography", group: "Fundacao", view: TextView },
  { id: "datepicker", label: "DatePicker", group: "Componentes", view: DatePickerView },
];

/** Agrupa as entradas por grupo, preservando a ordem de insercao. */
export function groupEntries(entries: MuralEntry[]): [string, MuralEntry[]][] {
  const map = new Map<string, MuralEntry[]>();
  for (const entry of entries) {
    const list = map.get(entry.group) ?? [];
    list.push(entry);
    map.set(entry.group, list);
  }
  return Array.from(map.entries());
}
