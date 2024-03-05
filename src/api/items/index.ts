import { applyPagination } from 'src/utils/apply-pagination';
import { deepCopy } from 'src/utils/deep-copy';
import { items } from './data';

export interface Item {
  id: string;
  description: string;
  price: number;
  quantity: number;
  amount: number;
}

type GetItemsRequest = {
  filters?: {
    name?: string;
    category?: string[];
    status?: string[];
    inStock?: boolean;
  };
  page?: number;
  rowsPerPage?: number;
};

type GetItemsResponse = Promise<{
  data: Item[]; // Use the Item interface instead of Product
  count: number;
}>;

class ItemsApi {
  private calculateAmount(item: Item): number {
    return item.quantity * item.price;
  }
  public calculateAmountForItem(item: Item): number {
    return this.calculateAmount(item);
  }

  private convertProductToItem(item: Item): Item {
    // Convert Product to Item, assuming the properties match
    return {
      id: item.id,
      description: item.description,
      price: item.price,
      quantity: item.quantity, // You may adjust the quantity based on your use case
      amount: 0, // This will be calculated later
    };
  }
  public calculateTotalAmount(items: Item[]): number {
    return items.reduce((total, item) => total + item.amount, 0);
  }
  getItems(request: GetItemsRequest = {}): GetItemsResponse {
    const { filters, page, rowsPerPage } = request;

    let data = deepCopy(items) as Item[];
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((product) => {
        if (typeof filters.name !== 'undefined' && filters.name !== '') {
          const nameMatched = product.description
            .toLowerCase()
            .includes(filters.name.toLowerCase());

          if (!nameMatched) {
            return false;
          }
        }

        // ... (remaining filtering logic)

        return true;
      });

      // Convert filtered products to items
      data = data.map(this.convertProductToItem);

      // Recalculate count based on items
      count = data.length;
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    // Calculate the amount for each item
    data.forEach((item) => {
      item.amount = this.calculateAmount(item);
    });
    const totalAmount = this.calculateTotalAmount(data);

    return Promise.resolve({
      data,
      count,
      totalAmount,
    });
  }
}

export const itemsApi = new ItemsApi();
