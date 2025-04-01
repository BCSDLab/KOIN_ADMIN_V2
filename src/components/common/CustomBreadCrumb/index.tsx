import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

type BreadcrumbItem = {
  label: React.ReactNode;
  path?: string;
};

interface CustomBreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export default function CustomBreadcrumb({ items, separator = '/' }: CustomBreadcrumbProps) {
  return (
    <Breadcrumb style={{ marginLeft: '40px' }} separator={separator}>
      {items.map((item) => (
        <Breadcrumb.Item key={String(item.label)}>
          {item.path ? <Link to={item.path}>{item.label}</Link> : item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
