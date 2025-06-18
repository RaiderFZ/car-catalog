import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('_limit') || '12';
  const page = searchParams.get('_page') || '1';
  const sort = searchParams.get('_sort');
  const order = searchParams.get('_order');

  const url = new URL('https://testing-api.ru-rating.ru/cars');
  url.searchParams.set('_limit', limit);
  url.searchParams.set('_page', page);
  if (sort && order) {
    url.searchParams.set('_sort', sort);
    url.searchParams.set('_order', order);
  }

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });

  const data = await res.json();
  return NextResponse.json(data);
}