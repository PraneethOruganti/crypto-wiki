import { createFileRoute } from '@tanstack/react-router';
import DefinitionsManager from '../../components/DefinitionsManager';

export const Route = createFileRoute('/editor/')({
  component: DefinitionsManager,
});
